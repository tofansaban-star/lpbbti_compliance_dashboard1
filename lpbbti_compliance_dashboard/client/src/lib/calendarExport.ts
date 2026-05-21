import { MonthData, Deadline } from '@/data/complianceCalendarData';

/**
 * Generate Google Calendar event URL
 * https://calendar.google.com/calendar/u/0/r/eventedit?...
 */
export const generateGoogleCalendarUrl = (
  deadline: Deadline,
  month: MonthData,
  year: number = 2026
): string => {
  // Parse date
  const date = new Date(year, getMonthIndex(month.label), parseInt(deadline.tgl));

  // Format: YYYYMMDD
  const startDate = formatDateForGoogle(date);
  const endDate = formatDateForGoogle(new Date(date.getTime() + 24 * 60 * 60 * 1000)); // Next day

  const title = `[LPBBTI] ${deadline.item}`;
  const description = `Regulasi: ${deadline.regulasi}\n\nDeskripsi: ${deadline.deskripsi || deadline.item}`;

  const params = new URLSearchParams({
    text: title,
    dates: `${startDate}/${endDate}`,
    details: description,
    location: 'OJK - Compliance Dashboard',
  });

  return `https://calendar.google.com/calendar/u/0/r/eventedit?${params.toString()}`;
};

/**
 * Generate iCalendar (.ics) file content for all deadlines
 */
export const generateICalendarContent = (
  calendarData: MonthData[],
  year: number = 2026
): string => {
  const events = calendarData
    .flatMap((month) =>
      month.deadline.map((deadline) => generateICalendarEvent(deadline, month, year))
    )
    .join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LPBBTI Compliance Dashboard//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:LPBBTI Compliance Calendar 2026
X-WR-TIMEZONE:Asia/Jakarta
X-WR-CALDESC:Kalender Kepatuhan LPBBTI 2026
BEGIN:VTIMEZONE
TZID:Asia/Jakarta
BEGIN:STANDARD
TZOFFSETFROM:+0700
TZOFFSETTO:+0700
TZNAME:WIB
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
${events}
END:VCALENDAR`;
};

/**
 * Generate single iCalendar event
 */
function generateICalendarEvent(
  deadline: Deadline,
  month: MonthData,
  year: number
): string {
  const date = new Date(year, getMonthIndex(month.label), parseInt(deadline.tgl));
  const dateString = formatDateForICalendar(date);

  const uid = `${dateString}-${deadline.item.replace(/\s+/g, '-')}@lpbbti-compliance`;
  const title = `[LPBBTI] ${deadline.item}`;
  const description = `Regulasi: ${deadline.regulasi}\\n\\nDeskripsi: ${deadline.deskripsi || deadline.item}`;

  return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDateForICalendar(new Date())}
DTSTART;VALUE=DATE:${dateString}
DTEND;VALUE=DATE:${formatDateForICalendar(new Date(date.getTime() + 24 * 60 * 60 * 1000))}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:OJK - Compliance Dashboard
PRIORITY:${deadline.penting ? '1' : '5'}
STATUS:CONFIRMED
TRANSP:TRANSPARENT
END:VEVENT`;
}

/**
 * Download iCalendar file
 */
export const downloadCalendar = (calendarData: MonthData[], year: number = 2026) => {
  const content = generateICalendarContent(calendarData, year);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `LPBBTI_Compliance_Calendar_${year}.ics`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Format date for Google Calendar (YYYYMMDD)
 */
function formatDateForGoogle(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Format date for iCalendar (YYYYMMDD)
 */
function formatDateForICalendar(date: Date): string {
  return formatDateForGoogle(date);
}

/**
 * Get month index from month label
 */
function getMonthIndex(label: string): number {
  const months: Record<string, number> = {
    'Januari': 0,
    'Februari': 1,
    'Maret': 2,
    'April': 3,
    'Mei': 4,
    'Juni': 5,
    'Juli': 6,
    'Agustus': 7,
    'September': 8,
    'Oktober': 9,
    'November': 10,
    'Desember': 11,
  };
  return months[label] ?? 0;
}

/**
 * Generate CSV export for compliance calendar
 */
export const generateCSVContent = (calendarData: MonthData[], year: number = 2026): string => {
  const rows = [
    ['Tanggal', 'Bulan', 'Item', 'Regulasi', 'Penting', 'Deskripsi'],
  ];

  calendarData.forEach((month) => {
    month.deadline.forEach((deadline) => {
      const date = new Date(year, getMonthIndex(month.label), parseInt(deadline.tgl));
      rows.push([
        date.toLocaleDateString('id-ID'),
        month.label,
        deadline.item,
        deadline.regulasi,
        deadline.penting ? 'Ya' : 'Tidak',
        deadline.deskripsi || '',
      ]);
    });
  });

  return rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
};

/**
 * Download CSV file
 */
export const downloadCSV = (calendarData: MonthData[], year: number = 2026) => {
  const content = generateCSVContent(calendarData, year);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `LPBBTI_Compliance_Calendar_${year}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
