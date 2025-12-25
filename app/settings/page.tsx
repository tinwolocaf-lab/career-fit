'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Settings,
  Sun,
  Moon,
  Monitor,
  Globe,
  Key,
  Shield,
  Check,
  X,
  Lock,
  Unlock,
  AlertTriangle,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useI18n } from '@/lib/i18n/context';
import { toast } from 'sonner';
import {
  encryptApiKey,
  decryptApiKey,
  hasStoredKey,
  removeStoredKey,
  testGeminiKey,
} from '@/lib/crypto/byok';

type AIProvider = 'platform' | 'byok';

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [aiProvider, setAIProvider] = useState<AIProvider>('platform');
  const [apiKey, setApiKey] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [unlockPassphrase, setUnlockPassphrase] = useState('');
  const [keyStored, setKeyStored] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [decryptedKey, setDecryptedKey] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setMounted(true);
    setKeyStored(hasStoredKey());
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey || !passphrase) return;

    await encryptApiKey(apiKey, passphrase);
    setKeyStored(true);
    setApiKey('');
    setPassphrase('');
    toast.success(t.settings.keySaved);
  };

  const handleUnlockKey = async () => {
    const key = await decryptApiKey(unlockPassphrase);
    if (key) {
      setDecryptedKey(key);
      setIsUnlocked(true);
      setUnlockPassphrase('');
    } else {
      toast.error(t.settings.testFailed);
    }
  };

  const handleLockKey = () => {
    setDecryptedKey(null);
    setIsUnlocked(false);
  };

  const handleRemoveKey = () => {
    removeStoredKey();
    setKeyStored(false);
    setDecryptedKey(null);
    setIsUnlocked(false);
    toast.success(t.settings.keyRemoved);
  };

  const handleTestKey = async () => {
    const keyToTest = decryptedKey || apiKey;
    if (!keyToTest) return;

    setTesting(true);
    const isValid = await testGeminiKey(keyToTest);
    setTesting(false);

    if (isValid) {
      toast.success(t.settings.testSuccess);
    } else {
      toast.error(t.settings.testFailed);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t.settings.title}</h1>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.settings.appearance}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">{t.common.theme}</Label>
                  <p className="text-sm text-muted-foreground mb-3">{t.settings.themeDesc}</p>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme('light')}
                      className="gap-2"
                    >
                      <Sun className="h-4 w-4" />
                      {t.common.light}
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme('dark')}
                      className="gap-2"
                    >
                      <Moon className="h-4 w-4" />
                      {t.common.dark}
                    </Button>
                    <Button
                      variant={theme === 'system' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme('system')}
                      className="gap-2"
                    >
                      <Monitor className="h-4 w-4" />
                      {t.common.system}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">{t.common.language}</Label>
                  <p className="text-sm text-muted-foreground mb-3">{t.settings.languageDesc}</p>
                  <div className="flex gap-2">
                    <Button
                      variant={locale === 'en' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLocale('en')}
                      className="gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      English
                    </Button>
                    <Button
                      variant={locale === 'uz' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLocale('uz')}
                      className="gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      O'zbek
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.settings.aiSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">{t.settings.aiProvider}</Label>
                  <div className="mt-3 space-y-3">
                    <label
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        aiProvider === 'platform'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-border/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="aiProvider"
                        checked={aiProvider === 'platform'}
                        onChange={() => setAIProvider('platform')}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-foreground">{t.settings.platformAi}</div>
                        <div className="text-sm text-muted-foreground">
                          {t.settings.platformAiDesc}
                        </div>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        aiProvider === 'byok'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-border/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="aiProvider"
                        checked={aiProvider === 'byok'}
                        onChange={() => setAIProvider('byok')}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-foreground">{t.settings.byokAi}</div>
                        <div className="text-sm text-muted-foreground">{t.settings.byokAiDesc}</div>
                      </div>
                    </label>
                  </div>
                </div>

                {aiProvider === 'byok' && (
                  <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                    {keyStored ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-foreground">{t.settings.keyStored}</span>
                        </div>

                        {!isUnlocked ? (
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              {t.settings.enterPassphrase}
                            </p>
                            <input
                              type="password"
                              value={unlockPassphrase}
                              onChange={(e) => setUnlockPassphrase(e.target.value)}
                              placeholder={t.settings.passphrasePlaceholder}
                              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                            />
                            <div className="flex gap-2">
                              <Button onClick={handleUnlockKey} size="sm" className="gap-2">
                                <Unlock className="h-4 w-4" />
                                {t.settings.unlock}
                              </Button>
                              <Button
                                onClick={handleRemoveKey}
                                variant="destructive"
                                size="sm"
                                className="gap-2"
                              >
                                <X className="h-4 w-4" />
                                {t.settings.removeKey}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-background border border-border">
                              <code className="text-sm text-muted-foreground break-all">
                                {decryptedKey?.slice(0, 10)}...{decryptedKey?.slice(-4)}
                              </code>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={handleTestKey}
                                variant="outline"
                                size="sm"
                                disabled={testing}
                              >
                                {testing ? '...' : t.settings.testKey}
                              </Button>
                              <Button onClick={handleLockKey} variant="outline" size="sm" className="gap-2">
                                <Lock className="h-4 w-4" />
                                {t.settings.lock}
                              </Button>
                              <Button
                                onClick={handleRemoveKey}
                                variant="destructive"
                                size="sm"
                                className="gap-2"
                              >
                                <X className="h-4 w-4" />
                                {t.settings.removeKey}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <X className="h-4 w-4" />
                          <span>{t.settings.keyNotStored}</span>
                        </div>

                        <div>
                          <Label className="text-sm">{t.settings.apiKey}</Label>
                          <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder={t.settings.apiKeyPlaceholder}
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                          />
                        </div>

                        <div>
                          <Label className="text-sm">{t.settings.passphrase}</Label>
                          <input
                            type="password"
                            value={passphrase}
                            onChange={(e) => setPassphrase(e.target.value)}
                            placeholder={t.settings.passphrasePlaceholder}
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                          />
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t.settings.passphraseHint}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveKey}
                            size="sm"
                            disabled={!apiKey || !passphrase}
                            className="gap-2"
                          >
                            <Key className="h-4 w-4" />
                            {t.settings.saveKey}
                          </Button>
                          <Button
                            onClick={handleTestKey}
                            variant="outline"
                            size="sm"
                            disabled={!apiKey || testing}
                          >
                            {testing ? '...' : t.settings.testKey}
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm text-yellow-700 dark:text-yellow-400">
                            {t.settings.securityNotice}
                          </p>
                          <p className="mt-1 text-xs text-yellow-600/80 dark:text-yellow-500/80">
                            {t.settings.securityNoticeText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
