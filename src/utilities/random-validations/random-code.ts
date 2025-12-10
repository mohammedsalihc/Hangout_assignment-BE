export const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < 4; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;

};