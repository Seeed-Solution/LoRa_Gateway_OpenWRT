include $(TOPDIR)/rules.mk

PKG_NAME:=rgb-serve
PKG_VERSION:=1.0.3
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/rgb-serve
	CATEGORY:=SenseCAP
	SUBMENU:=Basic
	TITLE:=RGB Serve Program
	DEPENDS:=+breathing-led
endef

define Build/Compile
endef

define Package/rgb-serve/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/rgb-serve $(1)/usr/bin/

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/rgb-serve.init $(1)/etc/init.d/rgb-serve
endef

$(eval $(call BuildPackage,rgb-serve))
