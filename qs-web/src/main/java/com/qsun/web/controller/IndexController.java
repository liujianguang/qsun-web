package com.qsun.web.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.jfinal.kit.HttpKit;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.ehcache.CacheKit;
import com.qsun.base.common.BaseController;
import com.qsun.base.common.Pager;
import com.qsun.base.render.CaptchaRender;
import com.qsun.core.plugin.annotation.Control;
import com.qsun.tools.CacheUtil;
import com.qsun.tools.DateTools;
import com.qsun.tools.EhcacheConstants;
import com.qsun.web.model.MessageModel;
import com.qsun.web.model.MovieModel;
import com.qsun.web.model.NewsModel;
import com.qsun.web.model.PictureMapModel;

@Control(controllerKey = "/")
public class IndexController extends BaseController {
	private static final Logger LOGGER = LoggerFactory
			.getLogger(IndexController.class);

	public void index() {
		setAttr("menu", "index");
		NewsModel newsModel = NewsModel.dao.top();
		setAttr("newsModel", newsModel);
		render("index");
	}
	
	public void news() {
		setAttr("menu", "news");
		String para = getPara();
		if ("detail".equals(para)) {
			Integer id = getParaToInt("id");
			NewsModel news = NewsModel.dao.findById(id);
			Date date = news.get("create_time");
			String day = DateTools.getDate(date);
			setAttr("day", day);
			setAttr("news", news);
			render("news_detail");
		}else {
			Map<String, String[]> paraMap = getParaMap();
			String[] sources = paraMap.get("source");
			String source = "企业动态";
			if (sources != null) {
				source = sources[0];
			}
			setAttr("source", source);
			Pager pager = createPager();
			Page<NewsModel> newspage = NewsModel.dao.page(pager,source);
			setAttr("newsList", newspage.getList());
			setAttr("newspage", newspage);
			render("news");
		}
	}

	public void contact() {
		setAttr("menu", "contact");
		render("contact");
	}

	public void message() {
		String para = getPara();
		if ("add".equals(para)) {
			add();
		}else {
			setAttr("menu", "contact");
			render("message");
		}
	}
	
	public void add() {
		MessageModel message = getModel(MessageModel.class, "message");
		Map<String, String[]> paraMap = getParaMap();
		Map<String, Object> result = getResultMap();
		String[] captchas = paraMap.get("captcha");
		if (captchas != null && CaptchaRender.validate(this, captchas[0])) {
			Date date = new Date();
			message.set("create_time", date);
			if (message.save()) {
				result.put(RESULT, true);
				result.put(MESSAGE, "新增成功！");
				result.put("id", message.get("id"));
			} else {
				result.put(RESULT, false);
				result.put(MESSAGE, "新增失败！");
			}
		}else {
			result.put(MESSAGE, "验证码不正确！");
		}
		renderJson(result);
	}
	
	public void about() {
		setAttr("menu", "about");
		render("about");
	}
	public void culture() {
		setAttr("menu", "about");
		render("culture");
	}
	
	public void history() {
		setAttr("menu", "about");
		render("history");
	}
	
	public void honours() {
		setAttr("menu", "about");
		render("honours");
	}
	public void solution() {
		setAttr("menu", "solution");
		String para = getPara();
		if (para != null) {
			switch (para) {
			case "touying":
				render("solution/touying");
				break;
			case "jiaju":
				render("solution/jiaju");		
				break;
			case "yinxiang":
				render("solution/yinxiang");
				break;
			default:
				render("solution");
				break;
			}
		}else {
			render("solution");
		}
	}
	public void partner() {
		setAttr("menu", "partner");
		render("partner");
	}
	
	public void legalnotice() {
		setAttr("menu", "legalnotice");
		render("legalnotice");
	}
	
	
	
}
