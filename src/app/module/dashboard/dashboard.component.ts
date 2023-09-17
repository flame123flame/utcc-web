import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  imageUrl = './assets/images/logo3.png';
  public now: Date = new Date();
  _authService = inject(AuthService)
  activeIndex: number = 0;
  lastTenYears: { title: string; value: string; }[] = [];
  scrollableTabs: any[] = Array.from({ length: 10 }, (_, i) => ({ title: "Title", content: "Content" }));

  public userAppData: any;
  public appUserCount1: any;
  public appUserCount2: any;
  public appUserCount3: any;
  public appUserCount4: any;
  public appUserCount5: any;
  public userLabel: any;
  public options: any;
  public userUsageHoursData: any;

  constructor() {
    const currentYear = new Date().getFullYear() + 543;
    this.lastTenYears.push({ title: 'ทั้งหมด', value: "ALL" });
    for (let i = 0; i < 10; i++) {
      const year = currentYear - i;
      this.lastTenYears.push({ title: 'ปี ' + year.toString(), value: year.toString() });
    }
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  appUsageData = [
    { name: 'user1', country: 'USA', appname: 'app-1' },
    { name: 'user2', country: 'UK', appname: 'app-1' },
    { name: 'user3', country: 'Canada', appname: 'app-1' },
    { name: 'user4', country: 'Germany', appname: 'app-1' },
    { name: 'user5', country: 'Poland', appname: 'app-2' },
    { name: 'user6', country: 'USA', appname: 'app-2' },
    { name: 'user7', country: 'Canada', appname: 'app-2' },
    { name: 'user8', country: 'Germany', appname: 'app-3' },
    { name: 'user9', country: 'USA', appname: 'app-3' },
    { name: 'user10', country: 'Germany', appname: 'app-3' },
    { name: 'user11', country: 'Canada', appname: 'app-3' },
    { name: 'user12', country: 'USA', appname: 'app-3' },
    { name: 'user13', country: 'India', appname: 'app-3' },
    { name: 'user14', country: 'India', appname: 'app-3' },
    { name: 'user15', country: 'Canada', appname: 'app-4' },
    { name: 'user16', country: 'USA', appname: 'app-4' },
    { name: 'user17', country: 'India', appname: 'app-5' },
    { name: 'user18', country: 'India', appname: 'app-5' },
    { name: 'user19', country: 'Canada', appname: 'app-5' },
    { name: 'user20', country: 'USA', appname: 'app-5' },
    { name: 'user21', country: 'manager', appname: 'app-5' },
  ];

  ngOnInit() {
    this.appUserCount1 = this.appUsageData.filter(
      (app) => app.appname === 'app-1'
    ).length;
    this.appUserCount2 = this.appUsageData.filter(
      (app) => app.appname === 'app-2'
    ).length;
    this.appUserCount3 = this.appUsageData.filter(
      (app) => app.appname === 'app-3'
    ).length;
    this.appUserCount4 = this.appUsageData.filter(
      (app) => app.appname === 'app-4'
    ).length;
    this.appUserCount5 = this.appUsageData.filter(
      (app) => app.appname === 'app-5'
    ).length;

    this.userLabel = this.appUsageData
      .map((app) => app.appname)
      .filter((value, index, self) => self.indexOf(value) === index);

    this.userAppData = {
      labels: this.userLabel,
      datasets: [
        {
          data: [
            this.appUserCount1,
            this.appUserCount2,
            this.appUserCount3,
            this.appUserCount4,
            this.appUserCount5,
          ],
          backgroundColor: [
            '#ff0000',
            '#0000FF',
            '#FFFF00',
            '#FFC0CB',
            '#7f00ff ',
          ],
        },
      ],
    };

    this.userUsageHoursData = {
      labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      datasets: [
        {
          label: 'ตั๋วลดหย่อน',
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          data: [44, 65, 23, 77, 55, 30, 45, 60, 40, 75, 85, 92],
        },
        {
          label: 'ตั๋วลดเต็มราคา',
          backgroundColor: '#2eb85c',
          borderColor: '#2eb85c',
          data: [14, 65, 16, 100, 30, 60, 75, 55, 90, 45, 70, 80],
        },
      ],
    };


    this.options = {
      //display labels on data elements in graph
      plugins: {
        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 4,
          backgroundColor: 'teal',
          color: 'white',
          font: {
            weight: 'bold',
          },
        },
        // display chart title
        title: {
          display: true,
          fontSize: 16,
        },
        legend: {
          position: 'bottom',
        },
        scales: {
          x: {
            barThickness: 5, // ปรับขนาดแท่งกราฟตามที่ต้องการ
            // ... (ตัวเลือกแกน x อื่น ๆ ที่คุณต้องการ)
          },
          y: {
            // ... (ตัวเลือกแกน y อื่น ๆ ที่คุณต้องการ)
          },
        },
      },
    };
  }
}