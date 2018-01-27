<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends MX_Controller {
	public function __construct()
	{
		$this->load->helper('form');
        $this->load->library('form_validation');	
	}

	public function index()
	{
		$this->form_validation->set_rules('username', 'Username', 'required');
		$this->form_validation->set_rules('password', 'Password', 'required');
		$this->form_validation->set_rules('passconf', 'Password Confirmation', 'required');
		$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
		if ($this->form_validation->run() == FALSE) {
                $this->load->view('form');
        }
        else {
                $this->load->view('formsuccess');
        }
		
	}

	public function popup()
	{
		echo '<div class="popup">
<div class="modal-dialog modal-dialog-doc">
<div class="modal-content">
	<div class="modal-header modal-header-doc-add ">
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		<span aria-hidden="true" style="font-size:25px;">&times;</span></button>
		<div class="title-doc-add"><?php echo $msg ?><hr /></div>                       
	</div>
	<div class="modal-body frm-login">
		<div class="row">
			this is body
		</div>
	</div>
</div>
</div>
</div>';
	}
}
