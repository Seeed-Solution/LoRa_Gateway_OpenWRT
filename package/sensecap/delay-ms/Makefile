include $(TOPDIR)/rules.mk

PKG_NAME:=delay-ms
PKG_VERSION:=1.0
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/delay-ms
	CATEGORY:=SenseCAP
	SUBMENU:=Delay
	TITLE:=delay millisecond
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	$(CP) ./src/* $(PKG_BUILD_DIR)/
endef

define Package/delay-ms/install
	$(INSTALL_DIR) $(1)/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/delay_ms $(1)/bin/
endef

$(eval $(call BuildPackage,delay-ms))