import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  empleados: any[]=[];
  constructor(private _empleadoService:EmpleadoService,
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados =[];
      data.forEach((element:any)=>{
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
      
    });
  }

  deleteEmpleado(id:string){
    this._empleadoService.deleteEmpleado(id).then(()=>{
      console.log('empleado eliminado con exito');
      this.toastr.error('El empleado fue eliminado con exito','Registro Eliminado',{
        positionClass: 'toast-bottom-right'
      });
    }).catch(error =>{
      console.log(error);
      
    })
  }
}
