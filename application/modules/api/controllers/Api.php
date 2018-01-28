<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//require(APPPATH'.libraries/REST_Controller.php');

class Api extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
    }

    public function index_get()
    {
        $this->response(['status' => 'ok', 'data' => [1,2,3,4,5,6]], REST_Controller::HTTP_OK);
    }

    public function auth_post()
    {
    	$data['usr'] = $this->post('username');
    	$data['pwd'] = $this->post('password');
    	$data['token'] = $this->post('token');
    	$user = $this->user_model->userLoginInfo($data['usr'], $data['pwd'], $data['token']);
		if ($user['id'] > 0) {
			$user_token = $data['token'];
			if ($this->user_model->userTokenExpired($data['token'])) {
    		  $this->user_model->delete_user_key($data['token']);
    		  $user_token = $this->user_model->updateUserToken($user['id']);
    		}
    		if ($user_token === null) {
    		  $user_token = $this->user_model->getUserToken($user['id']);	
    		}
    		$userData = [
    			'token' => $user_token,
    			'uid' => $user['id']
    		];
    		$this->response(['status' => 'ok', 'data' => $userData], REST_Controller::HTTP_OK);
		} else {
			$this->response(['status' => 'false','msg' => 'Login false'], REST_Controller::HTTP_OK);
		}
    }

    public function checktoken_post()
    {
    	$token = $this->post('token');
    	$tokenInfo = $this->user_model->getTokenInfo($token);
    	if ($tokenInfo) {
    	  $this->response(['status' => 'false','data' => $tokenInfo], REST_Controller::HTTP_OK);
    	} else {
    	  $this->response(['status' => 'ok','msg' => 'Token is exist'], REST_Controller::HTTP_OK);
    	}
    }
}