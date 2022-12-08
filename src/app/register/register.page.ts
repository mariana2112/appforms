import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;
  usuario: Usuario = new Usuario();

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres.' },
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório.' },
      { tipo: 'invalido', mensagem: 'CPF Inválido.' },
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' },
    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha.' },
    ],
  };

  constructor(private formBuilder: FormBuilder,private storageService: StorageService, private route: Router) {
    this.formRegister = this.formBuilder.group({
      nome: [, Validators.compose([Validators. required, Validators.minLength (3)])],

      cpf: [, Validators.compose([Validators.required])],

      email: ['', Validators.compose([Validators.required, Validators.email])],

      senha: ['', Validators.compose ([Validators.required, Validators.minLength (6), Validators.maxLength (8)])],

      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength (6), Validators.maxLength (8)])]
    });
  }

  async ngOnInit() {
  }
  async salvarRegister() {
    if(this.formRegister.valid){
      this.usuario.nome = this.formRegister.value.nome;
      this.usuario.cpf = this.formRegister.value.cpf;
      this.usuario.email = this.formRegister.value.email;
      this.usuario.senha = this.formRegister.value.senha;
      this.storageService.set(this.usuario.email, this.usuario);
      this.route.navigateByUrl('/tabs/tab2');
    } else{
      alert('Formulário Inválido !!!');
    }
  }


}
