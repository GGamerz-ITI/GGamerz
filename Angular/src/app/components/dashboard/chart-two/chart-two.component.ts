import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chart-two',
  templateUrl: './chart-two.component.html',
  styleUrls: ['./chart-two.component.css']
})
export class ChartTwoComponent implements OnInit {
  public chart: any;

  tags: any[] = [];
  tagCount: any[] = [];
  user: any;
  orders: any[] = [];

  constructor(private toastr: ToastrService, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.fetchData()
  }
  fetchData() {
    const ordersObservable = this.orderService.getAllOrders(); //get current user
    if (ordersObservable) {
      ordersObservable.subscribe({
        next: (data: any) => {
          this.orders = data;
          this.getTags()
          setTimeout(() => {
            this.createChart();
          }, 100)
        },
        error: (err: any) => {console.log(err)
        }
      });
    }
  }
  getTags() {
    this.orders = this.orders.filter(order => order.status == 'accepted')
    console.log(this.orders)
    this.orders.forEach((order: any) => {
      if (order.Games) {
        order.Games.forEach((game: any) => {
          if (game.tags) {
            game.tags.forEach((tag: string) => {
              if (this.tags.length > 0) {
                const index = this.tags.findIndex((item: any) => item === tag);
                if (index === -1) {
                  this.tags.push(tag);
                  this.tagCount[this.tags.length - 1] = 1;
                } else {
                  this.tagCount[index]++;
                }
              }
              else
                this.tags.push(tag);
              this.tagCount[0] = 1;
            });
          }
        });
      }
    })
  }
  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie',

      data: {// values on X-Axis
        labels: this.tags,
        datasets: [
          {
            data: this.tagCount,
            backgroundColor: [
              '#26d9ac',
              '#60709f',
              'rgba(112, 192, 219)',
              'rgb(160, 160, 119)',
              'rgb(135, 96, 96)',
              'lightgray',

            ],
            // hoverOffset: 4
          }],
      },
      options: { //forsize of chart
        aspectRatio: 2.5,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }

    });
  }
}
