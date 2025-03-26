document.addEventListener('DOMContentLoaded', async () => {
    const notesContainer = document.getElementById('notes');
    const noteFiles = ['notes/note1.json']; // این باید داینامیک بشه (مثلاً با API)

    try {
        const notesPromises = noteFiles.map(file =>
            fetch(file).then(res => {
                if (!res.ok) throw new Error(`فایل ${file} پیدا نشد`);
                return res.json();
            })
        );

        const notes = await Promise.all(notesPromises);

        notes.forEach(data => {
            const noteElement = document.createElement('div');
            noteElement.className = 'col-12 col-md-6 col-lg-4'; // واکنش‌گرا برای اندازه‌های مختلف
            noteElement.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title" data-bs-toggle="collapse" data-bs-target="#desc-${data.title.replace(/\s+/g, '-')}" aria-expanded="false">
                            ${data.title}
                        </h5>
                        <p class="card-text collapse" id="desc-${data.title.replace(/\s+/g, '-')}">${data.description}</p>
                    </div>
                </div>
            `;
            notesContainer.appendChild(noteElement);
        });
    } catch (error) {
        console.error('خطا در بارگذاری یادداشت‌ها:', error);
        notesContainer.innerHTML = '<p class="text-center text-danger">مشکلی در بارگذاری یادداشت‌ها پیش آمد.</p>';
    }
});