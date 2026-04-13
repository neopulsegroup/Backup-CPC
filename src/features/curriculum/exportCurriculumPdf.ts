import html2pdf from 'html2pdf.js';

/** Margens ABNT (NBR 14724): superior e esquerda 3 cm; inferior e direita 2 cm — [top, left, bottom, right] em mm */
const ABNT_MARGIN_MM: [number, number, number, number] = [30, 30, 20, 20];

export function sanitizeCurriculumPdfFileName(name: string): string {
  const trimmed = name.trim();
  const base = trimmed
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 72);
  return base || 'curriculo';
}

function createPrintableClone(source: HTMLElement): { node: HTMLElement; cleanup: () => void } {
  const clone = source.cloneNode(true) as HTMLElement;

  // Remove visual spacing from the dashboard card/session wrapper.
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.border = '0';
  clone.style.borderRadius = '0';
  clone.style.boxShadow = 'none';
  clone.style.background = '#ffffff';
  clone.style.width = '100%';
  clone.style.maxWidth = 'none';

  const mount = document.createElement('div');
  mount.style.position = 'fixed';
  mount.style.left = '-10000px';
  mount.style.top = '0';
  mount.style.width = '210mm';
  mount.style.background = '#ffffff';
  mount.style.padding = '0';
  mount.style.margin = '0';
  mount.appendChild(clone);
  document.body.appendChild(mount);

  return {
    node: clone,
    cleanup: () => {
      if (mount.parentNode) mount.parentNode.removeChild(mount);
    },
  };
}

/**
 * Gera PDF A4 vertical a partir do nó da pré-visualização do currículo.
 * Usa margens ABNT e respeita `break-inside: avoid` / classe `.cv-pdf-keep-together` via html2pdf.js.
 */
export async function exportCurriculumPreviewToPdf(element: HTMLElement, filename: string): Promise<void> {
  const { node, cleanup } = createPrintableClone(element);
  const worker = html2pdf().set({
    margin: ABNT_MARGIN_MM,
    filename,
    image: { type: 'jpeg', quality: 0.92 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: {
      mode: ['css', 'legacy'],
      avoid: ['.cv-pdf-keep-together'],
    },
  });

  try {
    await worker.from(node).save();
  } finally {
    cleanup();
  }
}
