include $(TOPDIR)/rules.mk

PKG_NAME:=breathing-led
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/breathing-led
	CATEGORY:=SenseCAP
	SUBMENU:=Basic
	TITLE:=Breathing led config
endef

define Build/Compile
endef

define Package/breathing-led/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/breathing_led $(1)/usr/bin/breathing_led
endef

$(eval $(call BuildPackage,breathing-led))
