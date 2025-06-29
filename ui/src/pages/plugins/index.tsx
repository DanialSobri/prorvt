import React, { useEffect, useState } from 'react';
import { Button } from '@/components/custom/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { Download, Check, Info, AlertCircle, HelpCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface PluginRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  created_at?: string;
  updated: string;
  updates?: string;
  version: string;
  installer: string;
  size?: string;
}

const SYSTEM_REQUIREMENTS = [
  { label: 'Autodesk Revit 2022 or later', color: 'text-blue-600' },
  { label: 'Windows OS', color: 'text-blue-600' },
  { label: 'Minimum 8GB RAM recommended', color: 'text-blue-600' },
  { label: 'At least 500MB free disk space', color: 'text-blue-600' },
  { label: 'Intel i5 or equivalent, 64-bit', color: 'text-blue-600' },
  { label: 'Internet Connection Required to View Families', color: 'text-blue-600' },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
}

function getUserFriendlyFileName(version: string) {
  return `ProRVT_v${version}_Setup.exe`;
}

const PluginsPage: React.FC = () => {
  const [plugins, setPlugins] = useState<PluginRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'created' | 'updated'>('created');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://brezelbits.xyz/api/collections/plugin/records?sort=-created')
      .then(res => res.json())
      .then(data => {
        setPlugins(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load plugins');
        setLoading(false);
      });
  }, []);

  const filteredPlugins = plugins.filter(p => {
    const userFriendlyName = getUserFriendlyFileName(p.version).toLowerCase();
    const matchesName = userFriendlyName.includes(search.toLowerCase());
    return matchesName;
  }).sort((a, b) => {
    // Always sort by created date descending for latest
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });

  const latest = filteredPlugins[0];
  const rest = filteredPlugins.slice(1);

  return (
    <div className="max-w-3xl mx-auto py-6 px-2">
      {/* Guidance & Install Link */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-2 text-blue-900 bg-blue-50 border border-blue-200 rounded px-3 py-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Which version should I choose?</span>
          <span className="text-xs text-blue-700">Latest is recommended for most users. Use older versions only if you have compatibility issues.</span>
        </div>
      </div>

      {/* Update Banner */}
      {latest && (
        <div className="mb-6">
          <Alert className="bg-green-50 border-green-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-semibold text-green-800">Plugin Updated <span className="ml-2 px-2 py-0.5 rounded-full bg-green-200 text-green-900 text-xs font-bold">Latest</span></div>
                <div className="text-green-800">Plugin version {latest.version} was updated on {formatDate(latest.updated)} <span className="text-xs text-green-700 ml-2">({timeAgo(latest.updated)})</span>.</div>

                <div className="mt-2">
                  <span className="font-semibold flex items-center gap-1"><Info className="h-4 w-4" /> System Requirements:</span>
                  <ul className="list-disc pl-5 text-sm">
                    {SYSTEM_REQUIREMENTS.map(req => (
                      <li key={req.label} className={req.color}>{req.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.location.href = `https://brezelbits.xyz/api/files/${latest.collectionId}/${latest.id}/${latest.installer}`}>
                <Download size={16} className="mr-2" /> Download
              </Button>
              <Button size="sm" variant="outline" className="border-green-200 text-green-800" onClick={() => window.open('/docs/install', '_blank')}>
                Installation Instruction
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* Search, Sort */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <Input
          placeholder="Search by version..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="md:ml-auto flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={sort}
            onChange={e => setSort(e.target.value as 'created' | 'updated')}
          >
            <option value="created">Created</option>
            <option value="updated">Last Updated</option>
          </select>
        </div>
      </div>

      {/* Plugin Cards */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading plugins...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : filteredPlugins.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No plugins found.</div>
      ) : (
        filteredPlugins.map((plugin, idx) => (
          <div key={plugin.id}>
            <Card className="mb-2 shadow-sm border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold">PRORVT</CardTitle>
                  {idx === 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-green-200 text-green-900 text-xs font-bold">Latest</span>}
                  {idx > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 text-xs font-bold">Stable</span>}
                  <span className="bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs font-semibold ml-2">v{plugin.version}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.location.href = `https://brezelbits.xyz/api/files/${plugin.collectionId}/${plugin.id}/${plugin.installer}`}>
                    <Download size={16} className="mr-2" /> Download
                  </Button>
                  <span className="text-xs text-gray-500 mt-1">{plugin.size || 'Unknown size'}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-1 pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-1">
                  <div className="flex-1">
                    <div className="mb-1">
                      <span className="font-semibold">What's New:</span>
                      {plugin.updates ? (
                        <ul className="list-disc pl-5 text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: plugin.updates }} />
                      ) : (
                        <span className="text-sm text-muted-foreground ml-2">No update notes.</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 min-w-[180px] mt-2 md:mt-0">
                    <span className="font-mono text-xs">{getUserFriendlyFileName(plugin.version)}</span>
                    <span className="text-xs text-gray-500">{plugin.size || 'Unknown size'}</span>
                    <span className="text-xs text-gray-500">Created: {formatDate(plugin.created_at || plugin.created)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {idx < filteredPlugins.length - 1 && <div className="border-b border-gray-200 my-4" />}
          </div>
        ))
      )}
    </div>
  );
};

export default PluginsPage;
