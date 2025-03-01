// scan-type-selector.ts

export enum ScanType {
    QR_CODE = 'QR_CODE',
    BARCODE = 'BARCODE',
    MANUAL_ENTRY = 'MANUAL_ENTRY',
}

export class ScanTypeSelector {
    private selectedScanType: ScanType;

    constructor(initialType: ScanType = ScanType.QR_CODE) {
        this.selectedScanType = initialType;
    }

    getSelectedType(): ScanType {
        return this.selectedScanType;
    }

    setSelectedType(type: ScanType): void {
        this.selectedScanType = type;
    }

    handleScanResult(result: string): void {
        switch (this.selectedScanType) {
            case ScanType.QR_CODE:
                console.log('Scanned QR Code:', result);
                break;
            case ScanType.BARCODE:
                console.log('Scanned Barcode:', result);
                break;
            case ScanType.MANUAL_ENTRY:
                console.log('Manual Entry:', result);
                break;
            default:
                console.warn('Unknown scan type');
        }
    }
}
