document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.beautiful-button');
    button.addEventListener('click', function() {
        // Create blur overlay
        const blurOverlay = document.createElement('div');
        blurOverlay.style.position = 'fixed';
        blurOverlay.style.top = '0';
        blurOverlay.style.left = '0';
        blurOverlay.style.width = '100%';
        blurOverlay.style.height = '100%';
        blurOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        blurOverlay.style.zIndex = '999';
        blurOverlay.style.backdropFilter = 'blur(5px)';

        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '1000';

        const modal = document.createElement('div');
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '10px';
        modal.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';


        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.style.marginBottom = '10px';
        inputBox.style.padding = '10px';
        inputBox.style.width = '100%';
        
        inputBox.style.boxSizing = 'border-box';

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';
        submitButton.style.padding = '10px 20px';
        submitButton.style.backgroundColor = '#007bff';
        submitButton.style.color = 'white';
        submitButton.style.border = 'none';
        submitButton.style.borderRadius = '5px';
        submitButton.style.cursor = 'pointer';
        
        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.style.padding = '10px 20px';
        cancelButton.style.backgroundColor = '#007bff';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.marginLeft = '10px';

        // Append elements to modal
        modal.appendChild(inputBox);
        modal.appendChild(submitButton);
        modal.appendChild(cancelButton);
        modalOverlay.appendChild(modal);
        document.body.appendChild(blurOverlay);
        document.body.appendChild(modalOverlay);

        // Add event listener for submit button
        submitButton.addEventListener('click', function() {
                console.log(inputBox.value);
        });

        cancelButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
            document.body.removeChild(blurOverlay);
        })
    });
});
