include $(TOPDIR)/rules.mk

PKG_NAME:=station
PKG_VERSION:=2.0.6
PKG_RELEASE:=5

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)
PKG_REV:=44126f446f2cd041675089ce4e266daddd8508a8
PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL=git@gitlab.com:seeedstudio/openwrt/basicstation.git
PKG_SOURCE_VERSION:=$(PKG_REV)
PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION)-$(PKG_REV).tar.gz

include $(INCLUDE_DIR)/package.mk

define Package/station
	SECTION:=lora
	CATEGORY:=SenseCAP
	SUBMENU:=LoRaWAN
	TITLE:=a LoRaWAN Gateway implementation from Semtech
	DEPENDS:=+kmod-spi-dev +librt +libpthread +kmod-ledtrig-oneshot +libmbedtls +libc
endef


define Package/station/description
  Basic Station is an implementation of a LoRa packet forwarder,
  which is a program running on the host of a LoRa gateway (with or 
  without GPS), forwarding RF packets received by the 
  concentrator (uplinks) to a LoRaWAN Network Server (LNS) 
  through some secured IP link and transmitting RF packets sent by the 
  LNS (downlinks) through the same secured IP to some device.
endef

define Package/station/install
	$(INSTALL_DIR) $(1)/usr/bin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/build-corecell-std/bin/station $(1)/usr/bin/

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/station.init $(1)/etc/init.d/station
	
	$(INSTALL_DIR) $(1)/etc/station
	$(INSTALL_DATA) ./files/station.conf $(1)/etc/station/station.conf
	$(INSTALL_BIN) ./files/radio_init.sh $(1)/etc/station/radio_init.sh
	$(INSTALL_BIN) ./files/gen_station_conf $(1)/usr/bin/gen_station_conf
endef

$(eval $(call BuildPackage,station))