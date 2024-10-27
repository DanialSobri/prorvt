import { useState, useEffect } from 'react';
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/custom/button';
import { FamilyDetail } from './components/modal';
import PocketBase from 'pocketbase';
import { Vendor, Category, Families } from '@/data/interfaces';
const appText = new Map<string, string>([
  ['all', 'All Families'],
  ['free', 'Free'],
  ['premium', 'Premium'],
]);

export default function Apps() {
  const [token, setToken] = useState<string | null>(null);
  const [sort, setSort] = useState('ascending');
  const [appType, setAppType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Families | null>(null);
  const [families, setFamilies] = useState<Families[]>([]);

  useEffect(() => {
    const pb = new PocketBase('http://210.195.96.20:8080');

    async function authenticateUser() {
      try {
        const backendUrl = 'http://210.195.96.20:8080';
        const email = 'adanial091@gmail.com';
        const password = 'pr0j3k1rv1!';

        if (!email || !password) {
          console.error('Email or password environment variables are not set.');
          return;
        }

        const authData = await pb.collection('users').authWithPassword(email, password);
        setToken(authData.token);
        if (!token) {
          // console.error('Authentication failed.');
        }
        // you can also fetch all records at once via getFullList
        const records = await pb.collection('families').getFullList({
          sort: '-created',
          expand: 'category,vendor', // Include the category data
        });

        const familiesData: Families[] = records.map(record => ({
          category: record.expand?.category as Category,
          collectionId: record.collectionId,
          collectionName: record.collectionName,
          created: record.created,
          desc: record.desc,
          freemium: record.freemium,
          id: record.id,
          vendor: record.expand?.vendor as Vendor,
          name: record.name,
          nested_family: record.nested_family,
          parametric: record.parametric,
          rfa: backendUrl + "/api/files/" + record.collectionId + "/" + record.id + "/" + record.rfa,//http://210.195.96.20:8080/api/files/pfjvvyqwpr5vpng/2usiorck1p7fezz/pr_glss_master_skin_wardrobe_w0001_3LYg0SzxhI.rfa?token=
          specification: record.specification,
          thumbnail: backendUrl + "/api/files/" + record.collectionId + "/" + record.id + "/" + record.thumbnail, //http://210.195.96.20:8080/api/files/pfjvvyqwpr5vpng/2usiorck1p7fezz/pr_glss_master_skin_wardrobe_w0001_8yRRsxIHhZ.png?token=
          updated: record.updated,
        }));
        setFamilies(familiesData);

      } catch (error) {
        console.error('Authentication failed:', error);
      }
    }
    authenticateUser();
  },);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const filteredApps = families
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app: Families) => {
      if (appType === 'all') {
        return app;
      }
      return app.freemium === appType;
    }
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleItemClick = (app: Families) => {
    toggleModal();
    setSelectedItem(app);
  };

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='flex w-full items-center justify-end'>
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </LayoutHeader>

      {/* ===== Content ===== */}
      <LayoutBody className='flex flex-col' fixedHeight>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Discover
          </h1>
          <p className='text-muted-foreground'>
            Parametric families for revit!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter families...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger className='w-36'>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Families</SelectItem>
                <SelectItem value='free'>Free</SelectItem>
                <SelectItem value='premium'>Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow' />
        <ul className='no-scrollbar grid gap-4 overflow-y-scroll pb-16 pt-4 md:grid-cols-4 lg:grid-cols-5 grid-cols-2'>
          {filteredApps.map((app) => (
            <li
              key={app.name}
              className='rounded-lg border p-4 hover:shadow-md cursor-pointer'
              onClick={() => handleItemClick(app)}
            >
              <img
                src={app.thumbnail}
                alt={app.name}
                width={200}
                height={200}
                style={{ objectFit: 'cover', minWidth: '150px', minHeight: '150px', maxWidth: '150px', maxHeight: '150px' }}
              />
              <div className='mb-8 flex items-center justify-between'>
                <Button
                  variant='outline'
                  size='sm'
                  className={`${app.freemium == "free" ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                >
                  {app.freemium == "free" ? 'Free' : 'Premium'}
                </Button>
              </div>
              <div>
                <h2 className='mb-1 font-semibold text-xs md:text-sm'>{app.name}</h2>
                <p className='line-clamp-2 text-gray-500 text-xs md:text-sm'>{app.desc}</p>
              </div>
              <div>
                {isModalOpen && selectedItem && <FamilyDetail isOpen={isModalOpen} onClose={toggleModal} item={selectedItem} />}
              </div>
            </li>
          ))}
        </ul>
      </LayoutBody>
    </Layout>
  );
}