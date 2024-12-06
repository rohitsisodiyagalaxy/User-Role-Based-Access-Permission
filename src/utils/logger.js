export async function logAction(action, userid/* , details = {} */) {
    try {
      await fetch('/api/logAction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userid/* , details  */}),
      });
    } catch (error) {
      console.error('Failed to log action', error);
    }
  }
  