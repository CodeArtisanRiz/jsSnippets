function generateHTML() {
    const inputText = document.getElementById('input-text').value;
    const outputHtml = document.getElementById('output-html');

    // Split the input text into lines
    const lines = inputText.split('\n');

    // Initialize variables for tracking the current section and subsection
    let currentSection = '';
    let currentSubsection = '';

    // Generate the HTML table structure
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Global Pet Care Market Report</title>
  <style>
    table {
      border-collapse: collapse;
      width: 80%;
      margin: 0 auto;
    }
    th, td {
      text-align: left;
      padding: 8px;
    }
    th {
      background-color: #9893f5;
    }
  </style>
</head>
<body>

<table>\n`;

    // Iterate over each line of the input text
    lines.forEach(line => {
        // Check if the line is empty
        if (line.trim() === '') {
            return;
        }

        // Check if the line starts with a number followed by a dot
        if (/^\d+\.\s*/.test(line)) {
            // Extract the section number and title
            const [sectionNumber, sectionTitle] = line.split('. ');

            // Check if this is a new section
            if (currentSection !== sectionNumber) {
                // If this is not the first section, close the previous section
                if (currentSection !== '') {
                    html += `  </tr>\n`;
                }

                // Update the current section
                currentSection = sectionNumber;

                // Start a new section
                html += `  <tr>\n    <th>${sectionNumber}. ${sectionTitle}</th>\n  </tr>\n`;
            }
        } else {
            // Extract the subsection number and title
            const [subsectionNumber, subsectionTitle] = line.split('. ');

            // Calculate the number of &emsp; to add
            const emspCount = (subsectionNumber.match(/\./g) || []).length;

            // Build the &emsp; string
            let emsp = '';
            for (let i = 0; i < emspCount; i++) {
                emsp += '&emsp;';
            }

            // Check if this is a new subsection
            if (currentSubsection !== subsectionNumber) {
                // Close the previous subsection
                if (currentSubsection !== '') {
                    html += `    </td>\n  </tr>\n`;
                }

                // Update the current subsection
                currentSubsection = subsectionNumber;

                // Start a new subsection
                html += `  <tr>\n    <td>${emsp}${subsectionNumber}. ${subsectionTitle}</td>\n  </tr>\n`;
            }
        }
    });

    // Close the last subsection and section
    if (currentSubsection !== '') {
        html += `    </td>\n  </tr>\n`;
    }
    if (currentSection !== '') {
        html += `  </tr>\n`;
    }

    // Close the HTML table
    html += `</table>\n</body>\n</html>`;

    // Set the generated HTML to the output section
    outputHtml.value = html;
}

function copyToClipboard() {
    const outputHtml = document.getElementById('output-html');
    outputHtml.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}
