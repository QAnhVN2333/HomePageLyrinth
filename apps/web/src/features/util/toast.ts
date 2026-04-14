export function showToast(message: string, duration: number = 3000, isSuccess: boolean = true, customClass: string = 'mc-server-toast') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    const toast = document.createElement('div');
    toast.className = `toast ${customClass}`;
    if (isSuccess) {
        toast.classList.add('toast-success');
    } else {
        toast.classList.add('toast-error');
    }
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}