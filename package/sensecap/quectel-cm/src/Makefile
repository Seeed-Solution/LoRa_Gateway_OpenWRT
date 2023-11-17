ifndef CFLAGS
CFLAGS = -O2 -g -I ../src
endif
LIBS=-lpthread -ldl

all: quectel-CM

%.o: %.c
	$(CC) $(CFLAGS) -c -o $@ $^

quectel-CM: main.o util.o udhcpc.o dhcpclient.o QmiWwanCM.o QMIThread.o MPQMUX.o GobiNetCM.o
	$(CC) $(LDFLAGS) -o $@ $^ $(LIBS)
