export default function generateMockOkxWithdrawalId(min = 16, max = 20) {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let id = "";
    for (let i = 0; i < length; i++) {
        id += Math.floor(Math.random() * 10); // 0–9
    }
    return id;
}

console.log(generateMockOkxWithdrawalId());