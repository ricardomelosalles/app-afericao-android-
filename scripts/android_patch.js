// Ajustes nativos do projeto Android: adiciona o plugin de impressão (window.print não funciona no WebView).
const fs = require('fs');
const path = require('path');
const cfg = JSON.parse(fs.readFileSync('capacitor.config.json', 'utf8'));
const dir = path.join('android', 'app', 'src', 'main', 'java', ...cfg.appId.split('.'));
if (!fs.existsSync(dir)) { console.error('Pasta do app não encontrada: ' + dir); process.exit(1); }

fs.writeFileSync(path.join(dir, 'MainActivity.java'), `package ${cfg.appId};

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(PrintPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
`);

fs.writeFileSync(path.join(dir, 'PrintPlugin.java'), `package ${cfg.appId};

import android.content.Context;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.webkit.WebView;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ImprimirApp")
public class PrintPlugin extends Plugin {
    @PluginMethod
    public void imprimir(final PluginCall call) {
        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    WebView wv = getBridge().getWebView();
                    PrintManager pm = (PrintManager) getActivity().getSystemService(Context.PRINT_SERVICE);
                    PrintDocumentAdapter adapter = wv.createPrintDocumentAdapter("Relatorio_Temperaturas");
                    PrintAttributes attrs = new PrintAttributes.Builder()
                        .setMediaSize(PrintAttributes.MediaSize.ISO_A4.asLandscape())
                        .build();
                    pm.print("Relatorio_Temperaturas", adapter, attrs);
                    call.resolve();
                } catch (Exception e) {
                    call.reject(e.getMessage());
                }
            }
        });
    }
}
`);
console.log('Plugin de impressão criado em ' + dir);
