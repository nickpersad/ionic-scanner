import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import * as ScanditSDK from 'scandit-sdk';
import { BarcodePicker, ScanResult } from 'scandit-sdk';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.css'],
})
export class HomePage {
  public scannerReady = false;
  public showButton = false;
  public showDescription = true;
  public result = '';

  @ViewChild('barcodePicker') barcodePickerElement: ElementRef<
    HTMLDivElement & { barcodePicker: BarcodePicker }
  >;
  constructor() {}
  public onReady(): void {
    this.scannerReady = true;
    this.showButton = true;
  }

  public onScan(scanResult: { detail: ScanResult }): void {
    const calculatedString = scanResult.detail.barcodes.reduce(
      (result, barcode) => {
        return `${result} ${ScanditSDK.Barcode.Symbology.toHumanizedName(
          barcode.symbology
        )} : ${barcode.data}`;
      },
      ''
    );

    this.result = calculatedString;
  }

  public startBarcodePicker(): void {
    this.showButton = false;
    this.showDescription = false;

    this.barcodePickerElement.nativeElement.barcodePicker
      .setVisible(true)
      .resumeScanning();
  }
  public stopBarCode(): void {
    this.showButton = true;
    this.showDescription = true;

    this.barcodePickerElement.nativeElement.barcodePicker
      .setVisible(false)
      .pauseScanning();
  }
}
