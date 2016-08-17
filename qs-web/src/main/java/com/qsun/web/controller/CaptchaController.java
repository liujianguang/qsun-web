package com.qsun.web.controller;

import com.jfinal.core.Controller;
import com.qsun.base.render.CaptchaRender;


public class CaptchaController extends Controller {
	
	public void index(){
		render(new CaptchaRender(88,40,4,true));
	}

}
