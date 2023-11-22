include $(TOPDIR)/rules.mk

PKG_NAME:=sx1302_hal
PKG_VERSION:=2.1.0
PKG_RELEASE:=16


PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)
PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/Lora-net/sx1302_hal/tar.gz/refs/tags/V$(PKG_VERSION)?
PKG_SOURCE_VERSION:=4b42025d1751e04632c0b04160e0d29dbbb222a5
PKG_HASH=4b62aa6a83ad449c68fdd844fc35024586c9faabca3c5a90a2544735b380de5b
PKG_LICENSE_FILES:=LICENSE

include $(INCLUDE_DIR)/package.mk


define Package/lora_pkt_fwd
	SECTION:=lora
	CATEGORY:=SenseCAP
	SUBMENU:=LoRaWAN
	TITLE:=Semtech packet forwarder for General
	DEPENDS:=+kmod-spi-dev +librt +libpthread +kmod-ledtrig-oneshot
	MENU:=1
endef

define Package/lora_pkt_fwd/description
  A LoRa packet forwarder is a program running on the host of a LoRa gateway
  that forwards RF packets receive by the concentrator to a server through a
  IP/UDP link, and emits RF packets that are sent by the server.
endef

define Package/lora_pkt_fwd/config
	select BUSYBOX_DEFAULT_USLEEP
endef

#TARGET_CFLAGS += $(FPIC) -O2 -Wall -Wextra -std=c99 -Iinc -I. -lm  -I../libtools/inc -DSPI_SPEED=$(CONFIG_SX1302_SPI_SPEED)
TARGET_CFLAGS = -O2 -Wall -Wextra -std=c99 -Iinc -I. -lm  -I../libtools/inc -DSPI_SPEED=$(CONFIG_SX1302_SPI_SPEED) -DI2C_DEVICE=\\\"$(CONFIG_SX1302_I2C_PATH)\\\" -DLED_NAME=\\\"$(CONFIG_SX1302_LED_NAME)\\\" -DLED_INTERVAL=\\\"$(CONFIG_SX1302_LED_INTERVAL)\\\"

define Package/lora_pkt_fwd/conffiles
/etc/config/lora_radio
/etc/config/lora_network
endef

define Package/lora_pkt_fwd/install
	$(INSTALL_DIR) $(1)/usr/bin/lora
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/packet_forwarder/lora_pkt_fwd $(1)/usr/bin/lora/
	$(INSTALL_BIN) ./files/usr/bin/lora/reset_lgw.sh $(1)/usr/bin/lora/
	$(INSTALL_BIN) ./files/usr/bin/lora/gen_lora_conf $(1)/usr/bin/lora/
	$(INSTALL_DIR) $(1)/etc/lora
	$(INSTALL_DATA) ./files/etc/lora/*.* $(1)/etc/lora/
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/lora_pkt_fwd.init $(1)/etc/init.d/lora_pkt_fwd
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_DATA) ./files/etc/uci-defaults/* $(1)/etc/uci-defaults
endef

define Package/sx1302-utils
	SECTION:=lora
	CATEGORY:=SenseCAP
	SUBMENU:=LoRaWAN
	TITLE:=SX1302 Utils
	DEPENDS:=+kmod-spi-dev +librt +libpthread +kmod-ledtrig-oneshot
	MENU:=1
endef

define Package/sx1302-utils/description
  Utils for testing.
endef

define Package/sx1302-utils/config
  source "$(SOURCE)/Config.in"
endef

define Package/sx1302-utils/install
	$(INSTALL_DIR) $(1)/usr/bin/lora
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/libloragw/test_loragw* $(1)/usr/bin/lora/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_boot/boot $(1)/usr/bin/lora/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_chip_id/chip_id $(1)/usr/bin/lora/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_net_downlink/net_downlink $(1)/usr/bin/lora/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_spectral_scan/spectral_scan $(1)/usr/bin/lora/
endef

$(eval $(call BuildPackage,lora_pkt_fwd))
$(eval $(call BuildPackage,sx1302-utils))