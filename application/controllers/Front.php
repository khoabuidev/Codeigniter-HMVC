<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Front extends MX_Controller {
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

	public function test()
	{
		$this->load->library('encryption');
		//$token = crypt(substr( md5(rand()), 0, 7));
		$token = 'uid_12'.bin2hex($this->encryption->create_key(16));
		$expired_at = date(strtotime('+24 hours'));
		echo date('d-m-Y H:i:s',strtotime('+5 days'));
		//echo $expired_at;
		//echo $token;
	}
}
