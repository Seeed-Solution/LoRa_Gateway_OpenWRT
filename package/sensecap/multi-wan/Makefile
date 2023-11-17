include $(TOPDIR)/rules.mk

PKG_NAME:=multi-wan
PKG_VERSION:=1.1.3

include $(INCLUDE_DIR)/package.mk

define Package/multi-wan
	CATEGORY:=SenseCAP
	DEPENDS:=+mwan3
	TITLE:=Multi-network Switchover
	PKGARCH:=all
endef

define Package/multi-wan/description
	Automatic configuration of multi-network switching via mwan3
endef

define Build/Compile
endef

define Package/multi-wan/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/etc/config/.mwan3.config $(1)/etc/config/
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_DATA) ./files/etc/uci-defaults/* $(1)/etc/uci-defaults/
	$(INSTALL_DIR) $(1)/sbin/reload-defaults
	$(INSTALL_DATA) ./files/sbin/reload-defaults/* $(1)/sbin/reload-defaults
	$(INSTALL_DIR) $(1)/etc
	$(INSTALL_BIN) ./files/etc/mwan3.user $(1)/etc/mwan3.user
endef

$(eval $(call BuildPackage,multi-wan))
