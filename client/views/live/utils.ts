export function generateGuestId() {
    let guestId = localStorage.getItem("trophy-guest-id");

    if (!guestId) {
        guestId = crypto.randomUUID();
        localStorage.setItem("trophy-guest-id", guestId);
    }

    return guestId;
}
