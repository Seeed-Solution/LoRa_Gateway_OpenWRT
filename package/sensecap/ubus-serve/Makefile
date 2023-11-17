include $(TOPDIR)/rules.mk

PKG_NAME:=ubus-serve
PKG_VERSION:=1.0.3
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/ubus-serve
	CATEGORY:=SenseCAP
	SUBMENU:=Basic
	TITLE:=Ubus Serve Program
endef

define Build/Compile
endef

define Package/ubus-serve/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/ubus-serve.lua $(1)/usr/bin/ubus-serve

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/ubus-serve.init $(1)/etc/init.d/ubus-serve
endef

$(eval $(call BuildPackage,ubus-serve))
