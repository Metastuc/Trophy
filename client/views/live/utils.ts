export function generateGuestId() {
    let guestId = localStorage.getItem("trophy-guest-id");

    if (!guestId) {
        guestId = crypto.randomUUID();
        localStorage.setItem("trophy-guest-id", guestId);
    }

    return guestId;
}

export function updateGuestInvitationsState({
    action,
    from,
    state,
    to,
    username,
}: UpdateLiveStreamGuestsInvitationsState) {
    switch (action) {
        case "accept":
            if (from === username) {
                return {
                    ...state,
                    pendingGuests: state.pendingGuests.filter((id) => id !== to),
                    activeGuests: state.activeGuests.includes(to!)
                        ? state.activeGuests
                        : [...state.activeGuests, to as RedisParticipant["id"]],
                };
            }

            if (to === username) {
                return {
                    ...state,
                    incomingInvites: state.incomingInvites.filter((id) => id !== from),
                    activeGuests: state.activeGuests.includes(from)
                        ? state.activeGuests
                        : [...state.activeGuests, from],
                };
            }
            return state;

        case "cancel":
            if (from === username) {
                return {
                    ...state,
                    pendingGuests: state.pendingGuests.filter((id) => id !== to),
                };
            }

            if (to === username) {
                return {
                    ...state,
                    incomingInvites: state.incomingInvites.filter((id) => id !== from),
                };
            }
            return state;

        case "deny":
            if (from === username) {
                return {
                    ...state,
                    pendingGuests: state.pendingGuests.filter((id) => id !== to),
                };
            }

            if (to === username) {
                return {
                    ...state,
                    incomingInvites: state.incomingInvites.filter((id) => id !== from),
                };
            }
            return state;

        case "invite":
            if (from === username) {
                return {
                    ...state,
                    pendingGuests: state.pendingGuests.includes(to as RedisParticipant["id"])
                        ? state.pendingGuests
                        : [...state.pendingGuests, to as RedisParticipant["id"]],
                };
            }

            if (to === username) {
                return {
                    ...state,
                    incomingInvites: state.incomingInvites.includes(from)
                        ? state.incomingInvites
                        : [...state.incomingInvites, from],
                };
            }
            return state;

        case "revoke":
            if (from === username) {
                return {
                    ...state,
                    activeGuests: state.activeGuests.filter((id) => id !== to),
                };
            }

            if (to === username) {
                return {
                    ...state,
                    activeGuests: state.activeGuests.filter((id) => id !== from),
                };
            }
            return state;

        default:
            return state;
    }
}
