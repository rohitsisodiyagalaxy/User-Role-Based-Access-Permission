// lib/exportToCsv.js

const exportTeacherToCsv = (filename, rows) => {
  const csvContent = [
    ['Name', 'Age', 'Experience', 'Gender', 'Contact Number'], // Header
    ...rows.map(row => [
      row.name,
      row.age,
      row.experience,
      row.gender,
      row.phone,
    ])
  ]
    .map(e => e.join(',')) // Join each row to create CSV format
    .join('\n'); // Join rows with newlines

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportTeacherToCsv;
