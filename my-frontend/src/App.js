function sendMessage() {
  const input = document.getElementById('input').value.trim();
  if (input) {
      fetch(`http://localhost:5000/fetch-kural?query=${encodeURIComponent(input)}`)
          .then(response => response.json())
          .then(data => {
              // Check if the data is an object and display details
              if (data._id) {
                  const messageSection = document.getElementById('message-section');
                  messageSection.innerHTML = `
                      <div class="message bot-message">
                          <strong>Chapter Name:</strong> ${data.ChapterName}<br>
                          <strong>Section Name:</strong> ${data.SectionName}<br>
                          <strong>Verse:</strong> ${data.Verse}<br>
                          <strong>Translation:</strong> ${data.Translation}
                      </div>
                  `;
              } else {
                  // Handle case where no data is returned
                  const messageSection = document.getElementById('message-section');
                  messageSection.innerHTML += `
                      <div class="message bot-message">${data.response}</div>
                  `;
              }
          })
          .catch(error => {
              console.error('Error:', error);
              const messageSection = document.getElementById('message-section');
              messageSection.innerHTML += `
                  <div class="message bot-message">An error occurred. Please try again.</div>
              `;
          });
  } else {
      console.log('Input is empty');
  }
}
