package com.lasertag;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.zmxv.RNSound.RNSoundPackage;
import it.innove.BleManagerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import org.capslock.RNDeviceBrightness.RNDeviceBrightness;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSoundPackage(),
          new BleManagerPackage(),
          new RNI18nPackage(),
          new KCKeepAwakePackage(),
          new RNDeviceBrightness(),
          new VectorIconsPackage(),
          new MapsPackage(),
          new ReactNativeConfigPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
