package com.qsun.base.route;

import com.jfinal.config.Routes;
import com.qsun.web.controller.CaptchaController;

public class FrontRoutes extends Routes {

	@Override
	public void config() {
		add("/captcha",CaptchaController.class);
	}

}
