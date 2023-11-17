include $(TOPDIR)/rules.mk

PKG_NAME:=gpio-cmd
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/gpio-cmd
	CATEGORY:=SenseCAP
	SUBMENU:=Basic
	TITLE:=Gpio config
endef

define Build/Compile
endef

define Package/gpio-cmd/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/gpio_cmd $(1)/usr/bin/gpio_cmd
endef

$(eval $(call BuildPackage,gpio-cmd))
