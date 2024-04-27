function generateHTML() {
    const inputText = document.getElementById('input-text').value;
    const lines = inputText.split('\n');
    let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title><style>.table{width:100%}.data-row:nth-child(odd){background-color:#9893f5;color:#fff}.data-row:nth-child(even){background-color:#7e7bb0;color:#fff}.cell{padding:10px;border-bottom:1px solid #ddd}.cell-right{border-right:1px solid #ddd}.text-emphasis{font-weight:700;font-style:italic}</style></head><body><table class="table">\n<tbody>\n';

    for (const line of lines) {
        if (line.trim() === '') continue; // Skip empty lines
        const [label, value] = line.split('\t');
        html += `<tr class="data-row">\n`;
        html += `<td class="cell cell-right text-emphasis">${label}</td>\n`;
        html += `<td class="cell text-emphasis">${value}</td>\n`;
        html += '</tr>\n';
    }

    html += '</tbody>\n</table></body></html>';
    document.getElementById('output-html').innerHTML = html;
}


function copyToClipboard() {
    const outputHtml = document.getElementById('output-html');
    outputHtml.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}
