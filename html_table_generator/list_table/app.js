function generateHTML() {
    const inputText = document.getElementById('input-text').value;
    const outputHtml = document.getElementById('output-html');

    // Split the input text into lines
    const lines = inputText.split('\n');

    // Remove trailing spaces and replace multiple spaces with a single space
    const cleanedLines = lines.map(line => line.trim().replace(/\s+/g, ' '));

    // Initialize variables for tracking the current section and subsection
    let currentSection = '';
    let currentSubsection = '';

    // Generate the HTML table structure
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>List Table</title>
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
    cleanedLines.forEach(line => {
        // Check if the line is empty
        if (line === '') {
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
                    html += `</tr>\n`;
                }

                // Update the current section
                currentSection = sectionNumber;

                // Start a new section
                if (sectionNumber.split('.').length === 1) {
                    html += `<tr>\n<th>${sectionNumber}. ${sectionTitle}</th>\n  </tr>\n`;
                }
                // else if (sectionNumber.split('.').length > 1) {
                //     html += `<tr>\n<td>${sectionNumber}. ${sectionTitle}</td>\n  </tr>\n`;
                // }
                else {
                    tab = ''
                    for(let i = 1; i < sectionNumber.split('.').length; i++) {
                        tab += '&emsp;'
                    }
                    html += `<tr>\n<td>${tab} ${sectionNumber}. ${sectionTitle}</td>\n  </tr>\n`;
                }

                // Reset the current subsection
                currentSubsection = '';
            }
        } else {
            // Extract the point number and title
            const [pointNumber, pointTitle] = line.split('. ');

            // Calculate the number of tabs to add
            const tabCount = pointNumber.split('.').length - 1;

            // Build the tab string
            let tabs = '';
            for (let i = 0; i < tabCount; i++) {
                tabs += '\t';
            }

            // Check if this is a new subsection
            if (pointNumber.startsWith(currentSection) && !pointNumber.startsWith(currentSubsection)) {
                // Close the previous subsection
                if (currentSubsection !== '') {
                    html += `</td>\n</tr>\n`;
                }

                // Update the current subsection
                currentSubsection = pointNumber.split('.').slice(0, -1).join('.');

                // Start a new subsection
                html += `<tr>\n<td>${tabs}${pointNumber}. ${pointTitle}</td>\n`;
            } else {
                // This is not a subpoint, add it to the previous section
                if (currentSubsection === '') {
                    html += `<tr>\n<td>${tabs}${pointNumber}. ${pointTitle}</td>\n`;
                } else {
                    html += `${tabs}</td>\n<td>${tabs}${pointNumber}. ${pointTitle}</td>\n`;
                }
            }
        }
    });

    // Close the last subsection and section
    if (currentSubsection !== '') {
        html += `</td>\n</tr>\n`;
    }
    if (currentSection !== '') {
        html += `</tr>\n`;
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
