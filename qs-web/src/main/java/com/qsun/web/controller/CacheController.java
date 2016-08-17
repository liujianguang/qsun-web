package com.qsun.web.controller;

import com.jfinal.plugin.ehcache.CacheKit;
import com.qsun.base.common.BaseController;
import com.qsun.core.plugin.annotation.Control;
import com.qsun.tools.EhcacheConstants;

@Control(controllerKey = "/cache")
public class CacheController extends BaseController {
	public void index() {
		CacheKit.removeAll(EhcacheConstants.LIVE_INTERFACE);
		renderJson("flush all!");
	}
}
