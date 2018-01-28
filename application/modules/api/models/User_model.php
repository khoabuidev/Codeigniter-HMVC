<?php

class User_model extends CI_Model
{
    public function userTokenExpired($token)
    {
    	$curTime = time();
    	$sql = "SELECT id FROM users WHERE token = ? and expired_at <= ? LIMIT 1";
    	$query = $this->db->query($sql, [$token, $curTime]);
    	if ($query->row_object()) {
    		return true;
    	}
    	return false;
	}

	public function getTokenInfo($token)
	{
		$sql = "SELECT token, expired_at FROM users WHERE token = ? LIMIT 1";
    	$query = $this->db->query($sql, [$token]);
    	$arrToken = $query->row_array();
    	if ($arrToken) {
    		$arrToken['expired_at_date'] = date('d-m-Y H:i:s', $arrToken['expired_at']);
    		return $arrToken;
    	}
    	return [];
	}

	public function userLoginInfo($username, $password, $token)
	{
		$sql = "SELECT * FROM users WHERE (username = ? and password = ?) OR token = ?";
    	$query = $this->db->query($sql, [$username, $password, $token]);
    	$userInfo = $query->row_array();
    	if ($userInfo) {
		  return $userInfo;
    	} else {
    	  return ['id' => 0];
    	}
	}

	public function delete_user_key($user_token) 
	{
		$this->db->delete('keys', ['key' => $user_token]);
	}

	private function generateToken($user_id)
	{
		$token = $user_id.bin2hex($this->encryption->create_key(16));
		$expired_at = date(strtotime('+5 days'));
		return ['token' => $token, 'expired_at' => $expired_at];
	}

	public function updateUserToken($user_id)
	{
		$arrToken = $this->generateToken($user_id);
		$this->db->update('users', $arrToken, ['id' => $user_id]);
		$this->db->update('keys', ['key' => $arrToken['token']], ['user_id' => $user_id]);
		return $arrToken['token'];
	}

	public function getUserToken($user_id) 
	{
		$sql = "SELECT token FROM users WHERE id = ?";
    	$query = $this->db->query($sql, [$user_id]);
    	$obj = $query->row_object();
    	if ($obj) {
		  return $obj->token;
    	} else {
    	  return $this->updateUserToken($user_id);
    	}
	}
}