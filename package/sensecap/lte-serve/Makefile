include $(TOPDIR)/rules.mk

PKG_NAME:=lte-serve
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/lte-serve
	CATEGORY:=SenseCAP
	SUBMENU:=LTE
	TITLE:=LTE Serve Program
	DEPENDS:=+quectel-cm
endef

define Build/Compile
endef

define Package/lte-serve/conffiles
/etc/config/lte_config
endef

define Package/lte-serve/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/lte-serve $(1)/usr/bin/
	$(INSTALL_BIN) ./files/quectel-reset.sh $(1)/usr/bin/

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/lte-serve.init $(1)/etc/init.d/lte-serve

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) ./files/lte_config $(1)/etc/config/lte_config

	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_DATA) ./files/99_lte_serve $(1)/etc/uci-defaults
endef

$(eval $(call BuildPackage,lte-serve))
