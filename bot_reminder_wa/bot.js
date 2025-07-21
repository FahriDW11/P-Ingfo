import cron from "node-cron";
import {
    makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";

import {
    getAllTasks,
    addTask,
    deleteTask,
    markAsDone,
    getDueTasks,
} from "./db.js";

import qrcode from "qrcode-terminal";

const RETRY_LIMIT = 5;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
    });

    let reconnectAttempts = 0;
    let qrdisplayed= false;
    
    sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update;
        if (qr && !qrdisplayed) {
            // Cetak QR code ke terminal
            qrcode.generate(qr, { small: true });
            console.log("Scan QR code ini dengan WhatsApp di HP kamu");
            qrdisplayed= true;
        }

        if (connection === "close") {
            console.log("Connection closed, mencoba reconnect...");
            reconnectAttempts += 1;
            if (reconnectAttempts < RETRY_LIMIT){
                setTimeout(startBot, 1000)
            }
            else{
                console.log('Terlalu banyak percobaan reconnect.')
            }
        } else if (connection === "open") {
            console.log("Berhasil terhubung ke WhatsApp!");
        }
    });
    sock.ev.on("creds.update", saveCreds);

    
    sock.ev.on("messages.upsert", async ({ messages }) => {
        for (let msg of messages) {
            const senderJid = msg.key.remoteJid;
            
            if (senderJid.endsWith("@g.us")){
                console.log(`Message from group: ${senderJid}\nMessage from: ${msg.key.participant}\n`);
            }
            else{
                console.log(`Message from: ${senderJid}\n`);
            }
            
            // const group_id= '120363420758235647@g.us';
            // const kontak_id= '6281392862311@s.whatsapp.net';
            
            const message =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text;
            if (!message) return;
            
            const command = message.trim().toLowerCase();
            
            /// Handle perintah
            if (command === "!list") {
                const tasks = await getAllTasks();
                if (tasks.length === 0) {
                    await sock.sendMessage(senderJid, {
                        text: "📭 Tidak ada tugas saat ini.",
                    });
                    return;
                }
                
                const formatted = tasks
                .map(
                    (t) => `📝 ID: ${t.id}\n📌 ${t.title}\n⏰ ${t.deadline}`
                )
                .join("\n\n");
                await sock.sendMessage(senderJid, {
                    text: `📋 Daftar Tugas:\n\n${formatted}`,
                });
            }

            if (command.startsWith("!tambah")) {
                const parts = message.slice(7).split(";");
                if (parts.length !== 2) {
                    await sock.sendMessage(senderJid, {
                        text: "❌ Format salah.\nGunakan: !tambah Judul;YYYY-MM-DD HH:MM",
                    });
                    return;
                }
                
                const [title, deadline] = parts;
                await addTask(title.trim(), deadline.trim());
                await sock.sendMessage(senderJid, {
                    text: `🆕 Tugas "${title.trim()}" berhasil ditambahkan.`,
                });
            }
            
            if (command.startsWith("!hapus")) {
                const id = command.split(" ")[1];
                await deleteTask(id);
                await sock.sendMessage(senderJid, {
                    text: `🗑️ Tugas ID ${id} berhasil dihapus.`,
                });
            }
            
            if (command.startsWith("!selesai")) {
                const id = command.split(" ")[1];
                await markAsDone(id);
                await sock.sendMessage(senderJid, {
                    text: `✅ Tugas ID ${id} ditandai selesai.`,
                });
            }
        }
    });
    
    //temporary id
    const listid = {
        kontak_id: '6281392862311@s.whatsapp.net',
        group_id: '120363420758235647@g.us',
        // grup_kompe_id: 120363402683734714@g.us,
    };

    const id= listid.group_id; //ubah sesuai id group
    
    // const reminderIntervals = [60, 30, 20, 10, 5, 1];
    const reminderIntervals = Array.from({ length: 60 }, (_, i) => i + 1); //1-60

    // Scheduler setiap 1 menit
    cron.schedule("* * * * *", async () => {
        console.log("Cron job dijalankan"); //  wajib muncul setiap menit
        const dueTasks = await getDueTasks();
        console.log("pending Tasks:", dueTasks);

        for (let task of dueTasks) {
            // if (!task.recipient_jid) {
            //     console.error("❌ Recipient JID tidak valid untuk tugas ID", task.id);
            //     continue;  // Lewati tugas ini jika recipient_jid tidak valid
            // }
            const deadline = new Date(task.deadline);
            const now = new Date();
            const timeDifference = (deadline - now) / (1000 * 60); // Hitung selisih waktu dalam menit

            if (timeDifference <= 0) {
            // pesan waktu habis
            const overdueMsg = `⚠️ Waktu untuk tugas "${task.title}" sudah habis! ⏰\n\nTugas ini sudah mencapai deadline: ${task.deadline}`;
                try {
                    await sock.sendMessage(id, { 
                        text: overdueMsg 
                    });
                    await markAsDone(task.id); 
                    console.log(`✅ Reminder waktu habis untuk tugas ID ${task.id}`);
                } catch (err) {
                    console.error(`❌ Gagal kirim reminder waktu habis untuk tugas ID ${task.id}:`, err.message);
                }
            }

            reminderIntervals.forEach(async (interval) => {
                if (timeDifference <= interval && timeDifference > (interval - 1)) {
                    const reminderMsg = `📌 Reminder Tugas:\n\n📝 ${task.title}\n⏰ Deadline: ${task.deadline}\n\n${interval} menit sebelum deadline`;
                    const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;  //delay 1-3 detik
                    setTimeout(async ()=>{
                        try {
                            await sock.sendMessage(id, {
                                text: reminderMsg,
                            });
                            console.log(`✅ Reminder dikirim untuk tugas ID ${task.id} - ${interval} menit sebelum deadline`);
                        } catch (err) {
                            console.error(`❌ Gagal kirim reminder untuk tugas ID ${task.id}:`, err.message);
                        };
                    },delay);
                };
            });
        };
    });
};

startBot();
