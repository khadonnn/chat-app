// src/store/useCallStore.ts
import { create } from 'zustand';

export const useCallStore = create((set) => ({
    isVisible: false,
    isCaller: false,
    callerName: '',
    calleeName: '',
    callerImage: '',
    calleeImage: '',
    onAccept: null,
    onReject: null,

    openCallPopup: ({
        isCaller,
        callerName,
        calleeName,
        callerImage,
        calleeImage,
        onAccept,
        onReject,
    }) =>
        set({
            isVisible: true,
            isCaller,
            callerName,
            calleeName,
            callerImage,
            calleeImage,
            onAccept,
            onReject,
        }),

    closeCallPopup: () =>
        set({
            isVisible: false,
            isCaller: false,
            callerName: '',
            calleeName: '',
            callerImage: '',
            calleeImage: '',
            onAccept: null,
            onReject: null,
        }),
}));
