function initTabs() {
    // Select containers with 'tab-container' or backward compatible 'tab-group'
    const containers = document.querySelectorAll('.tab-container, .tab-group');

    containers.forEach(container => {
        const triggers = container.querySelectorAll('.tab-trigger');
        // If contents are not strictly inside, we might need to look document-wide or rely on ID matching only.
        // Current HTML structure has contents as siblings or children of a parent wrapper?
        // In the HTML I wrote:
        // <div class="tab-container">...buttons...</div>
        // <div class="tab-group">...contents...</div> 
        // 
        // Wait, I messed up the HTML replacement slightly potentially.
        // In my `account - detail.html` replacement:
        // replaced `tab - group mb - 6` div with `tab - container`.
        // BUT the content divs (tab-content) were inside ANOTHER `div class="tab-group"`.
        // See:
        // <div class="tab-group"> 
        //    <!-- Basic Info -->
        //    <div id="tab-basic" class="tab-content">

        // So the buttons are in `.tab - container` (prev `tab - group mb - 6`)
        // And contents are in `.tab - group`.
        // My simple JS looked for triggers AND contents inside the SAME `.tab - group`.

        // FIX: The JS should probably just bind global triggers to global IDs for simplicity in this project structure,
        // OR I need to make sure I select correctly.

        // Let's make the JS robust: finds all triggers in document, binds them to target IDs.
        // This is safe because IDs are unique.

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.dataset.target;
                const targetContent = document.getElementById(targetId);

                if (!targetContent) return;

                // Find all siblings of the trigger (tabs in same group)
                const parentNav = trigger.closest('.tab-nav') || trigger.parentNode;
                const siblingTriggers = parentNav.querySelectorAll('.tab-trigger');

                // Deactivate user-facing state
                siblingTriggers.forEach(t => t.classList.remove('active'));

                // Find all contents that belong to this group... 
                // Creating a strict group relation is hard without a wrapping parent.
                // EASIER APPROACH: Hide ALL tab-contents that correspond to the sibling triggers.
                siblingTriggers.forEach(t => {
                    const tId = t.dataset.target;
                    const c = document.getElementById(tId);
                    if (c) c.style.display = 'none';
                });

                // Activate Clicked
                trigger.classList.add('active');
                targetContent.style.display = 'block';
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initTabs);
