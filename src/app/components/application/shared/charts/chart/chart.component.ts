import { Component } from '@angular/core';
import { ResultService } from '../../../../../services/result/result.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentService } from '../../../../../services/department/department.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  pieData: any; // Chart data
  pieOptions: any;
  eval_result!:any[];
  teachersId:number = 0;

  constructor (
    private resultService: ResultService,
    private dialogRef: DynamicDialogRef,
    private departmentService: DepartmentService,
    private dialogConfig: DynamicDialogConfig,

    private messageService: MessageService
    
  ) {}
  ngOnInit(){

    this.getResult();
    this.loadData();
  }

  private loadData() {
    let data = this.dialogConfig.data;
    this.teachersId = data
  }

  private async getResult() {
    (await this.resultService.getResultByTeacherId(2)).subscribe({
      next: async (response: any) => {
        this.eval_result = await response.data.map((data: any) => ({
          label: data.subject_title,
          value: Number(data.sum)
        }));
        this.preparePieChartData(this.eval_result); 
      },
      error: (error: any) => {
        return;
      }
    });
  }

  private preparePieChartData(data: any[]) {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    this.pieData = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [ // Set background colors
            '#42A5F5',
            '#66BB6A',
            '#FFA726',
            '#FF7043',
            '#AB47BC'
          ],
        },
      ],
    };

    this.pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }


}
