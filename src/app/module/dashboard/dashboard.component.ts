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


  public options: any;
  public userUsageHoursData1: any;
  public userUsageHoursData2: any;
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



  ngOnInit() {

    this.userUsageHoursData1 = {
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
    this.userUsageHoursData2 = {
      labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      datasets: [
        {
          label: 'ตั๋วลดหย่อน',
          backgroundColor: '#f9b115',
          borderColor: '#f9b115',
          data: [44, 65, 23, 77, 55, 30, 45, 60, 40, 75, 85, 92],
        },
        {
          label: 'ตั๋วลดเต็มราคา',
          backgroundColor: '#d63636',
          borderColor: '#d63636',
          data: [14, 65, 16, 100, 30, 60, 75, 55, 90, 45, 70, 80],
        },
      ],
    };


    this.options = {
      responsive: false,
      maintainAspectRatio: false, // Set this to false to control the width and height manually
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
            barThickness: 1,
            // ... (other x-axis options)
          },
          y: {
            // ... (other y-axis options)
          },
        },
      },
      // Set the width and height here
      width: 500, // Set your desired width
      height: 300, // Set your desired height
    };

  }
}