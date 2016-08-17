package com.qsun.core.plugin.sqlxml;

import com.jfinal.plugin.IPlugin;
import com.qsun.core.kit.SqlXmlKit;


/**
 * 
 * @ClassName: SqlXmlPlugin 
 * @Description: sql xml 插件
 * @author Jeckey Lau
 * @date 2016年7月1日 上午9:32:26
 */
public class SqlXmlPlugin implements IPlugin {

	public SqlXmlPlugin() {
	}

	@Override
	public boolean start() {
		SqlXmlKit.init();
		return true;
	}

	@Override
	public boolean stop() {
		SqlXmlKit.destory();
		return true;
	}

}
