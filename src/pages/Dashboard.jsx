import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useAuth, API_BASE } from '@/lib/auth';
import { 
  Key, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  Loader2, 
  RefreshCw,
  User,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

const LLM_PROVIDERS = [
  { id: 'gemini', name: 'Google Gemini', prefix: 'AIza', color: 'text-blue-400' },
  { id: 'gpt', name: 'OpenAI GPT', prefix: 'sk-', color: 'text-green-400' },
  { id: 'claude', name: 'Anthropic Claude', prefix: 'sk-ant-', color: 'text-orange-400' },
];

export default function Dashboard() {
  const { user, token, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [accessKeys, setAccessKeys] = useState([]);
  const [llmKeys, setLLMKeys] = useState([]);
  const [generatedKey, setGeneratedKey] = useState('');
  const [isLoadingKeys, setIsLoadingKeys] = useState(true);
  const [isSavingKey, setIsSavingKey] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  
  const [llmInputs, setLLMInputs] = useState({
    gemini: '',
    gpt: '',
    claude: '',
  });
  const [savingLLM, setSavingLLM] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (token) {
      fetchAccessKeys();
      fetchLLMKeys();
    }
  }, [token]);

  const fetchAccessKeys = async () => {
    try {
      const response = await fetch(`${API_BASE}/tokens`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAccessKeys(data.accessKeys || []);
    } catch (error) {
      toast.error('Failed to fetch access keys');
    } finally {
      setIsLoadingKeys(false);
    }
  };

  const fetchLLMKeys = async () => {
    try {
      const response = await fetch(`${API_BASE}/llm/keys`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setLLMKeys(data.keys || []);
      
      // Populate inputs with existing keys (masked)
      const inputs = { gemini: '', gpt: '', claude: '' };
      (data.keys || []).forEach((key) => {
        inputs[key.provider] = key.api_key;
      });
      setLLMInputs(inputs);
    } catch (error) {
      toast.error('Failed to fetch LLM keys');
    }
  };

  const generateAccessKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'orbit_';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedKey(key);
  };

  const saveAccessKey = async () => {
    if (!generatedKey) {
      toast.error('Please generate a key first');
      return;
    }
    
    setIsSavingKey(true);
    try {
      const response = await fetch(`${API_BASE}/save-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accessKey: generatedKey }),
      });
      
      if (!response.ok) throw new Error('Failed to save');
      
      toast.success('Access key saved!');
      setGeneratedKey('');
      fetchAccessKeys();
    } catch (error) {
      toast.error('Failed to save access key');
    } finally {
      setIsSavingKey(false);
    }
  };

  const deleteAccessKey = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/delete-token/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error('Failed to delete');
      
      toast.success('Access key deleted');
      fetchAccessKeys();
    } catch (error) {
      toast.error('Failed to delete access key');
    }
  };

  const copyToClipboard = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const saveLLMKey = async (provider) => {
    const apiKey = llmInputs[provider];
    if (!apiKey) {
      toast.error('Please enter an API key');
      return;
    }
    
    setSavingLLM(provider);
    
    const existingKey = llmKeys.find(k => k.provider === provider);
    
    try {
      const url = existingKey ? `${API_BASE}/update-llm-key` : `${API_BASE}/save-llm-key`;
      const method = existingKey ? 'PUT' : 'POST';
      const body = existingKey 
        ? { id: existingKey.id, provider, apiKey }
        : { provider, apiKey };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save');
      }
      
      toast.success(`${provider.toUpperCase()} API key saved!`);
      fetchLLMKeys();
    } catch (error) {
      toast.error(error.message || 'Failed to save API key');
    } finally {
      setSavingLLM(null);
    }
  };

  const deleteLLMKey = async (id, provider) => {
    try {
      const response = await fetch(`${API_BASE}/delete-llm-key/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error('Failed to delete');
      
      setLLMInputs(prev => ({ ...prev, [provider]: '' }));
      toast.success('API key deleted');
      fetchLLMKeys();
    } catch (error) {
      toast.error('Failed to delete API key');
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-xl bg-primary/10">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Access Keys Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>CLI Access Keys</CardTitle>
                  <CardDescription>Generate access keys to authenticate OrbitCLI</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Generate Key */}
              <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Generate New Access Key
                </div>
                <div className="flex gap-2">
                  <Input
                    value={generatedKey}
                    readOnly
                    placeholder="Click generate to create a new key"
                    className="font-mono text-sm"
                  />
                  <Button variant="outline" onClick={generateAccessKey}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                {generatedKey && (
                  <Button onClick={saveAccessKey} disabled={isSavingKey} className="w-full">
                    {isSavingKey ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Access Key'
                    )}
                  </Button>
                )}
              </div>

              {/* Existing Keys */}
              {isLoadingKeys ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : accessKeys.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Your Access Keys</p>
                  {accessKeys.map((key) => (
                    <div
                      key={key.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                    >
                      <code className="text-sm font-mono text-muted-foreground truncate max-w-[300px]">
                        {key.accesskey.substring(0, 20)}...
                      </code>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(key.accesskey, key.id)}
                        >
                          {copiedId === key.id ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteAccessKey(key.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No access keys yet. Generate one above.
                </p>
              )}
            </CardContent>
          </Card>

          {/* LLM API Keys Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>LLM API Keys</CardTitle>
                  <CardDescription>Store your AI provider API keys securely</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {LLM_PROVIDERS.map((provider) => {
                const existingKey = llmKeys.find(k => k.provider === provider.id);
                
                return (
                  <div
                    key={provider.id}
                    className="p-4 rounded-lg bg-secondary/30 border border-border space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${provider.color}`}>{provider.name}</span>
                      {existingKey && (
                        <span className="text-xs text-success flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Connected
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={llmInputs[provider.id]}
                        onChange={(e) => setLLMInputs(prev => ({ ...prev, [provider.id]: e.target.value }))}
                        placeholder={`Enter your ${provider.name} API key (${provider.prefix}...)`}
                        className="font-mono text-sm"
                      />
                      <Button
                        onClick={() => saveLLMKey(provider.id)}
                        disabled={savingLLM === provider.id}
                      >
                        {savingLLM === provider.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : existingKey ? (
                          'Update'
                        ) : (
                          'Save'
                        )}
                      </Button>
                      {existingKey && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteLLMKey(existingKey.id, provider.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Key format: {provider.prefix}...
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}