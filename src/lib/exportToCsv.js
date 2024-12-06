// lib/exportToCsv.js

const exportToCsv = (filename, rows) => {
    const csvContent = [
      ['Name', 'Class','Attendance (%)', 'Grade', 'Remark'], // Header
      ...rows.map(row => [
        row.name,
        row.class,
        row.attendance,
        row.grade,
        row.remark
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
  
  export default exportToCsv;
  